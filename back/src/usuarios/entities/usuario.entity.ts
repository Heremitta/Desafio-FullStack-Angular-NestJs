import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';

@Table({ tableName: 'usuarios' })
export class Usuario extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  nome: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  senha: string;
}
