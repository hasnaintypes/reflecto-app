export interface SharedPerson {
  id: string;
  name: string;
  group: string | null;
  _count: {
    entries: number;
  };
}
