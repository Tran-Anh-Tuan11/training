import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Shop } from '../shop/shop.entity';  // Đảm bảo bạn import Shop đúng

@Entity()
export class Customization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    input_width: string;

    @Column()
    input_height: string;

    @Column()
    input_border: string;

    @Column()
    input_border_radius: string;

    @Column()
    input_background_color: string;

    @Column()
    border_width: string;

    @Column()
    border_color: string;

    @Column()
    button_width: string;

    @Column()
    button_height: string;

    @Column()
    button_border: string;

    @Column()
    button_background_color: string;

    @Column()
    button_text_color: string;

    @Column()
    direction: string;

    @Column({ nullable: true })
    css: string;

    @OneToOne(() => Shop, shop => shop.customization)
    shop: Shop;

}
