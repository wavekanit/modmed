import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class DocInfo {
    @PrimaryColumn()
    id: string;

    @Column()
    fName:string;

    @Column()
    lName:string;

    @Column()
    phoneNo:string;

    @Column()
    field:string;

    @Column()
    certificateNo:string;
}
