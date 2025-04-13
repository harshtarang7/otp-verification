import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class userEntity{
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({type:'varchar'})
    name:string;

    @Column({type:'varchar'})
    email:string;

    @Column({type:'date'})
    dob:string;

    @Column({type:'bool'})
    active:boolean;

    @Column({type:'bool'})
    verified:boolean;

    @CreateDateColumn({type:'timestamp'})
    created_at:string;

    @CreateDateColumn({type:'timestamp'})
    updated_at:string;
}