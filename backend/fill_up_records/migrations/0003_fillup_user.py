# Generated by Django 4.1.3 on 2022-12-09 19:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('fill_up_records', '0002_rename_vehicle_id_fillup_vehicle'),
    ]

    operations = [
        migrations.AddField(
            model_name='fillup',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]