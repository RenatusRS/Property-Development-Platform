export class Room {
	constructor(xLU: number, yLU: number, xRD: number, yRD: number) {
		this.xLU = xLU;
		this.yLU = yLU;
		this.xRD = xRD;
		this.yRD = yRD;
	}

	xLU: number;
	yLU: number;

	xRD: number;
	yRD: number;

	finished: boolean = false;
	workers: string[] = []; // inconsistent warning

	overlaps(room: Room): boolean {
		return this.xLU < room.xRD && this.xRD > room.xLU && this.yLU < room.yRD && this.yRD > room.yLU;
	}
	
	static withinRoom(room: Room, x: number, y: number): boolean {
		return room.xLU < x && room.xRD > x && room.yLU < y && room.yRD > y;
	}
}

export class Door {
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	x: number;
	y: number;

	isOnSide(rectangle) {
		const { xLU, yLU, xRD, yRD } = rectangle;

		// Check if the point is on any of the sides of the rectangle
		if (
			(this.x === xLU || this.x === xRD) && this.y >= yLU && this.y <= yRD ||
			(this.y === yLU || this.y === yRD) && this.x >= xLU && this.x <= xRD
		) {
			return true;
		}


		console.log(this.x, this.y, xLU, yLU, xRD, yRD)
		// Otherwise, the point is not on any side of the rectangle
		return false;
	}
}

export class Scheme {
	rooms: Room[] = [];
	doors: Door[] = [];
}

export class Offer {
	constructor(agency: string, time_start: Date, time_end: Date) {
		this.agency = agency;
		this.time_start = time_start;
		this.time_end = time_end;
	}
	
	agency: string;
	time_start: Date;
	time_end: Date;
}

export class Building {
	constructor(address: string, type: string) {
		this.address = address;
		this.type = type;
	}
	
	address: string; // unique
	type: string;

	scheme: Scheme = new Scheme();

	offers: Offer[] = [];
	status: string = "Pending";
	payment: number;
	
	client: string;
}

export class Rating {
	username: string; // unique

	positive: boolean;
	comment: string;
}

export class Worker {
	firstname: string;
	lastname: string;

	email: string; // unique
	phone: string;

	specialization: string;
}

export class User {
	constructor(
		username: string,
		password: string,
		phone: string,
		email: string,
		role: boolean,
		firstname: string,
		lastname: string,
		agency: string,
		address: string,
		identification: string,
		description: string
	) {
		this.username = username;

		this.password = password;

		this.role = role ? "Agency" : "Client";

		this.phone = phone;
		this.email = email;

		// Client

		this.firstname = firstname;
		this.lastname = lastname;

		// Agency

		this.name = agency;
		this.address = address;
		this.identification = identification;
		this.description = description;
	}


	username: string;

	password: string;

	role: string;

	phone: string;
	email: string;

	status: string = "Pending";

	// Client

	firstname: string;
	lastname: string;

	buildings: Building[] = [];

	// Agency

	name: string;
	address: string;
	identification: string;
	description: string;

	ratings: Rating[] = [];
	workers: Worker[] = [];
	allowed_workers: number;
	requested_workers: number;
}