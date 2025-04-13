import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class userOtpEntity{
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({type:'int4'})
    name:number;

    @Column({type:'varchar'})
    otp:string;

    @Column({type:'bool'})
    is_verified:boolean;

    @CreateDateColumn({type:'timestamp'})
    created_at:string;

    @CreateDateColumn({type:'timestamp'})
    updated_at:string;
}