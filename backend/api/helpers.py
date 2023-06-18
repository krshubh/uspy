from django.conf import settings
from django.core.mail import send_mail

from django.template.loader import get_template


def send_forgot_password_mail(user_name, email, password_reset_link):
    subject = "Your forgot password link"
    message = get_template('emails/send_email_forgot_password.html').render(
        {'user_name': user_name, 'password_reset_link': password_reset_link})
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail(subject, '', email_from, recipient_list, html_message=message)
    return True
