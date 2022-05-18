import {v4 as uuidV4} from "uuid";
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Category} from "@modules/cars/infra/typeorm/entities/Category";

@Entity("cars")
class Car {

    constructor() {
        this.id = uuidV4();
        this.available = true;
    }

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    available: boolean;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    category_id: string;

    @ManyToOne(() => Category)
    @JoinColumn({name: "category_id"})
    category: Category;
}

export {Car}