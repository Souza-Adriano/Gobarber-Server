export interface CreatedAt { created_at: Date }
export interface UpdatedAt { updated_at: Date }
export interface History extends CreatedAt, UpdatedAt {}