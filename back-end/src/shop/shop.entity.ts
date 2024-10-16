import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Customization } from '../customization/customization.entity';
import { Translation } from '../translation/translation.entity';


@Entity()
export class Shop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    shopify_domain: string;

    @Column()
    shop_owner: string;

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

    //1-1 với customization
    @OneToOne(() => Customization, customization => customization.shop, { cascade: true })
    @JoinColumn()
    customization: Customization;

    //1-n với translation
    @OneToMany(() => Translation, translation => translation.shop, { cascade: true })
    translations: Translation[];


}
