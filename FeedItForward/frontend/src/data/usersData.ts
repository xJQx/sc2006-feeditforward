import { UserDisplay } from "../utils/schema";

export const usersData: UserDisplay[] = [
  {
    userId: "1",
    name: "John",
    role: "Consumer",
    email: "john@gmail.com",
    contactNumber: "62547697",
    address: "Blk 1004 Toa Payoh Industrial Park Lorong 8, 03-1483",
    img: {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=987&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "profile pic"
    }
  },
  {
    userId: "2",
    name: "Tess",
    role: "Driver",
    email: "tess@gmail.com",
    contactNumber: "6776 0022",
    address: "43 Holland Drive, #01-67 270043",
    img: {
      src: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&q=80&w=987&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "profile pic"
    }
  },
  {
    userId: "3",
    name: "Jane",
    role: "Hawker",
    email: "jane@gmail.com",
    contactNumber: "62671571",
    address: "BLK 166 WOODLANDS STREET 13, #01-551",
    img: {
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=987&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "profile pic"
    }
  }
];
