import { Prop } from '@nestjs/mongoose';

export const FileProp = () =>
  Prop({ type: { public_id: String, url: String } });

export const FilePropArray = () =>
  Prop({ type: [{ public_id: String, url: String }] });
