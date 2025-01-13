import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome do usuário',
  })
  @Column({ nullable: false })
  nome: string;

  @ApiProperty({
    example: 25,
    description: 'Idade do usuário',
  })
  @Column({ nullable: false })
  idade: number;

  @ApiProperty({
    example: 'email@email.com',
    description: 'Email do usuário',
  })
  @Column({ unique: true, nullable: false })
  email: string;

  @ApiProperty()
  @Column({ nullable: false })
  password: string;
}