import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

import Image from './Image';

@Entity('rooms')
export default class Rooms {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    nameShow: string;

    @Column()
    campus: string;

    @Column()
    type: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    description: string;

    @OneToMany(() => Image, image => image.room, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'room_id' })
    images: Image[];

    @Column()
    link: string;

    @Column()
    piso: number;
}