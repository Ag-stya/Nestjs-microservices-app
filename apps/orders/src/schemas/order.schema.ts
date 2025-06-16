
import { AbstractDocument } from "@app/common/database/abstract.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({versionKey: false})
export class Order extends AbstractDocument{
    @Prop()
    name : String;
    @Prop()
    price: number;
    @Prop()
    phoneNumber: String;

}


export const OrderSchema= SchemaFactory.createForClass(Order);