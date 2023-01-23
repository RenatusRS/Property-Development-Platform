class Attendance {
	username: string;

	status: string;
}

class Chat {
	username: string;
	isOrganizator: boolean;

	time: Date;

	message: string;
}

class Comment {
	username: string;

	text: string;
}


export class Workshop {
	id: string;

	name: string;
	date: string;
	location: string;
	short_description: string;
	description: string;
	capacity: number;

	owner: string;

	status: string;

	comments: Comment[];
	likes: String[];
	attendees: Attendance[];
	chats: Chat[];
}