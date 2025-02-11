
export interface Creator {
    _id: string;
    username: string;
  }
  

export interface Event {
    _id: string;
    title: string;
    description: string;
    date: string;
    creator: Creator;
    attendees: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

export interface EventComponentProps {
    id : string;
    title: string;
    date: string;
    creator: string;
    description:string;
    onDelete: (id: string) => void
}


export interface User {
  id: string;
  username: string;
  email: string;

}

export interface UserContextType {
  user: User | null; 
  token: string | null;
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>; // identifier can be username or email
  logout: () => void;
}