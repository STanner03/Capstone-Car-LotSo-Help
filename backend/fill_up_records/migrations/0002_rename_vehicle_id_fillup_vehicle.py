# Generated by Django 4.1.3 on 2022-12-07 16:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fill_up_records', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='fillup',
            old_name='vehicle_id',
            new_name='vehicle',
        ),
    ]
