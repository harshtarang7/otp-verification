import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { userOtpEntity } from "../user-otp/user-otp.entity";

@Entity("users")
export class UserEntity{
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({type:'varchar'})
    name:string;

    @Column({type:'varchar'})
    email:string;

    @Column({type:'varchar'})
    password:string;

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

    @OneToMany(()=>userOtpEntity,(otp)=>otp.user)
    userOtp:userOtpEntity[];

    // hashing password before inserting and updating 
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(this.password){
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    async validatePassword(password:string):Promise<boolean>{
        const result = await bcrypt.compare(password, this.password);
        return result;
    }
}