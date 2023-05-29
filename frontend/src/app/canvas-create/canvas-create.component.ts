import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Door, Room, Scheme } from '../models/user';

const GRID_SIZE = 30; // Size of each grid cell

@Component({
	selector: 'app-canvas-create',
	templateUrl: './canvas-create.component.html',
	styleUrls: ['./canvas-create.component.css'],
})
export class CanvasCreateComponent implements OnInit, AfterViewInit {

	constructor() { }

	ngOnInit(): void {
	}

	@Input() mode: string = "none";
	@Input() error: boolean = false;

	@Input() scheme: Scheme;
	@Output() schemeChange = new EventEmitter<Scheme>();

	@ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;
	context: CanvasRenderingContext2D;

	isDrawing: boolean = false;
	startGridX: number;
	startGridY: number;
	endGridX: number;
	endGridY: number;
	
	ngOnChanges(): void {
		if (this.context) this.redraw();
	}

	ngAfterViewInit(): void {
		const canvas: HTMLCanvasElement = this.canvas.nativeElement;
		this.context = canvas.getContext('2d');
		this.context.strokeStyle = 'gray';
		this.context.fillStyle = 'gray';
		this.context.globalAlpha = 1;
	}

	onMouseDown(event: MouseEvent): void {
		if (this.mode != "draw") return;
		
		this.isDrawing = true;
		this.startGridX = Math.floor(event.offsetX / GRID_SIZE); // Convert pixel position to grid position
		this.startGridY = Math.floor(event.offsetY / GRID_SIZE);
	}

	onMouseUp(event: MouseEvent): void {
		if (this.mode == "draw") {
			this.isDrawing = false;
			this.endGridX = Math.floor(event.offsetX / GRID_SIZE);
			this.endGridY = Math.floor(event.offsetY / GRID_SIZE);

			if (this.endGridX === this.startGridX && this.endGridY === this.startGridY) {
				this.drawDoor();
			} else {
				this.drawRoom();
			}
		} else if (this.mode == "manage") {
			for (var room of this.scheme.rooms) {
				if (room.withinRoom(event.offsetX, event.offsetY)) {
					room.finished = !room.finished;
					break;
				}
			}
		};


		this.schemeChange.emit(this.scheme);

		this.redraw();
	}

	drawRoom(): void {
		if (Math.abs(this.startGridX - this.endGridX) < 1 || Math.abs(this.startGridY - this.endGridY) < 1) return;
		if (this.scheme.rooms.length >= 3) return;

		const xLU = Math.min(this.startGridX, this.endGridX);
		const yLU = Math.min(this.startGridY, this.endGridY);
		const xRD = Math.max(this.startGridX, this.endGridX);
		const yRD = Math.max(this.startGridY, this.endGridY);

		const room: Room = new Room(xLU * GRID_SIZE, yLU * GRID_SIZE, xRD * GRID_SIZE, yRD * GRID_SIZE);

		if (this.scheme.rooms.some(r => r.overlaps(room))) return;

		this.scheme.rooms.push(room);
	}

	drawDoor(): void {
		const door: Door = new Door(this.startGridX * GRID_SIZE, this.startGridY * GRID_SIZE);

		if (this.scheme.doors.some(d => d.x === door.x && d.y === door.y)) return;
		if (!this.scheme.rooms.some(r => door.isOnSide(r))) return;

		this.scheme.doors.push(door);
	}

	onMouseMove(event: MouseEvent): void {
		if (!this.isDrawing) return;

		this.redraw();

		this.endGridX = Math.floor(event.offsetX / GRID_SIZE);
		this.endGridY = Math.floor(event.offsetY / GRID_SIZE);

		this.drawRectangle();
	}

	drawRectangle(): void {
		const startX = this.startGridX * GRID_SIZE;
		const startY = this.startGridY * GRID_SIZE;
		const width = (this.endGridX - this.startGridX) * GRID_SIZE;
		const height = (this.endGridY - this.startGridY) * GRID_SIZE;

		this.context.strokeRect(startX, startY, width, height);
	}

	redraw(): void {
		this.clearCanvas();

		this.context.strokeStyle = 'black';

		this.scheme.rooms.forEach(room => {
			const startX = room.xLU;
			const startY = room.yLU;
			const width = (room.xRD - room.xLU);
			const height = (room.yRD - room.yLU);
			
			if (this.mode == "manage") {
				this.context.fillStyle = this.error ? 'yellow' : room.finished ? 'green' : 'red';
				this.context.fillRect(startX, startY, width, height);
			}

			this.context.strokeRect(startX, startY, width, height);
		});

		this.context.strokeStyle = 'brown';
		this.context.fillStyle = 'brown';

		this.scheme.doors.forEach(door => {
			const x = door.x;
			const y = door.y;

			this.context.fillRect(x - 5, y - 5, 10, 10);
		});

		this.context.strokeStyle = 'gray';
		this.context.fillStyle = 'gray';
	}

	clearCanvas(): void {
		const canvas: HTMLCanvasElement = this.canvas.nativeElement;
		this.context.clearRect(0, 0, canvas.width, canvas.height);
	}
}