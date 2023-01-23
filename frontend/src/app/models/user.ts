export class User {
	constructor(firstname: string, lastname: string, username: string, password: string, phone: string, email: string, role: string, organization: string, address: string, identification: string) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.username = username;
		this.password = password;
		this.phone = phone;
		this.email = email;

		this.role = role;

		this.organization = organization;
		this.address = address;
		this.identification = identification;
	}

	firstname: string;
	lastname: string;
	username: string;
	password: string;
	phone: string;
	email: string;

	role: string;

	organization: string;
	address: string;
	identification: string;

	status: string = "Pending";
}