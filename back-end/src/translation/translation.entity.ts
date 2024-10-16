import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Shop } from '../shop/shop.entity';

@Entity()
export class Translation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    locale: string;

    @Column('json')
    translate: { placeholder_text: string; button_text: string; };

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP (6)',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;

    @ManyToOne(() => Shop, shop => shop.translations)
    shop: Shop;


}
