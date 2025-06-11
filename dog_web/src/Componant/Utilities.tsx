import { createHash } from 'crypto';

export function sha256(items: string): string {
    return createHash('sha256').update(items).digest('hex');
}