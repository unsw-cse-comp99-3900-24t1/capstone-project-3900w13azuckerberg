"""change virus model

Revision ID: d5809b47fbf7
Revises: 293a24cad872
Create Date: 2024-06-22 19:03:21.015967

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'd5809b47fbf7'
down_revision = '293a24cad872'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    with op.batch_alter_table('virus_data', schema=None) as batch_op:
        batch_op.alter_column('strain',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               nullable=False)
        batch_op.alter_column('virus',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               nullable=False)
        batch_op.alter_column('segment',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               nullable=False)
        batch_op.alter_column('length',
               existing_type=sa.BIGINT(),
               type_=sa.Integer(),
               nullable=False)
        batch_op.alter_column('gisaid_epi_isl',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               nullable=False)
        batch_op.alter_column('date',
               existing_type=postgresql.TIMESTAMP(),
               type_=sa.Date(),
               nullable=False)
        batch_op.alter_column('division',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               nullable=False)
        batch_op.alter_column('location',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               existing_nullable=True)
        batch_op.alter_column('region_exposure',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               nullable=False)
        batch_op.alter_column('country_exposure',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               nullable=False)
        batch_op.alter_column('division_exposure',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               nullable=False)
        batch_op.alter_column('age',
               existing_type=sa.DOUBLE_PRECISION(precision=53),
               type_=sa.Integer(),
               existing_nullable=True)
        batch_op.alter_column('sex',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               existing_nullable=True)
        batch_op.alter_column('originating_lab',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               nullable=False)
        batch_op.alter_column('submitting_lab',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               nullable=False)
        batch_op.alter_column('date_submitted',
               existing_type=postgresql.TIMESTAMP(),
               type_=sa.Date(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('virus_data', schema=None) as batch_op:
        batch_op.alter_column('date_submitted',
               existing_type=sa.Date(),
               type_=postgresql.TIMESTAMP(),
               nullable=True)
        batch_op.alter_column('submitting_lab',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               nullable=True)
        batch_op.alter_column('originating_lab',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               nullable=True)
        batch_op.alter_column('sex',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               existing_nullable=True)
        batch_op.alter_column('age',
               existing_type=sa.Integer(),
               type_=sa.DOUBLE_PRECISION(precision=53),
               existing_nullable=True)
        batch_op.alter_column('division_exposure',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               nullable=True)
        batch_op.alter_column('country_exposure',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               nullable=True)
        batch_op.alter_column('region_exposure',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               nullable=True)
        batch_op.alter_column('location',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               existing_nullable=True)
        batch_op.alter_column('division',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               nullable=True)
        batch_op.alter_column('date',
               existing_type=sa.Date(),
               type_=postgresql.TIMESTAMP(),
               nullable=True)
        batch_op.alter_column('gisaid_epi_isl',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               nullable=True)
        batch_op.alter_column('length',
               existing_type=sa.Integer(),
               type_=sa.BIGINT(),
               nullable=True)
        batch_op.alter_column('segment',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               nullable=True)
        batch_op.alter_column('virus',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               nullable=True)
        batch_op.alter_column('strain',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               nullable=True)

    op.create_table('user',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('username', sa.VARCHAR(length=20), autoincrement=False, nullable=False),
    sa.Column('email', sa.VARCHAR(length=120), autoincrement=False, nullable=False),
    sa.Column('password', sa.VARCHAR(length=60), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='user_pkey'),
    sa.UniqueConstraint('email', name='user_email_key'),
    sa.UniqueConstraint('username', name='user_username_key')
    )
    # ### end Alembic commands ###
