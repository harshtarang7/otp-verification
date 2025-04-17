import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../user/users.entity";

@Entity('user_otp_verification')
export class userOtpEntity{
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({type:'int4'})
    user_id:number;

    @Column({type:'varchar'})
    otp:string;

    @Column({type:'bool'})
    is_verified:boolean;

    @CreateDateColumn({type:'timestamp'})
    created_at:Date;

    @UpdateDateColumn({type:'timestamp'})
    updated_at:Date;

    @Column({type:'timestamp'})
    expires_at:Date;

    @ManyToOne(()=>UserEntity,(user)=>user.userOtp)
    @JoinColumn({name:'user_id'})
    user:UserEntity
}