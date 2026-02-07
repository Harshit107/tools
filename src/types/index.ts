export interface Website {
  id: string;
  title: string;
  url: string;
  folderId: string;
  favicon?: string;
  createdAt: number;
  username?: string;
  encryptedPassword?: string;
}

export interface Folder {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
}
