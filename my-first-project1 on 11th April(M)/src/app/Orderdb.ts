import { Item } from './Item';
import { OrderItem } from './OrderItem';
import { Customer } from './Customer';

export class Orderdb{
    Id : number;
    OrderNo ?: number;
    TotalQuantity : number;
    OrderDate : Date;
    CustomerId : number;
    Orderitems :  OrderItem[];
    TotalPrice : number;
    CustomerName : string
    Customer : Customer;
}