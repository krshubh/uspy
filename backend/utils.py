from django.core.mail import send_mail


def send_message(sender_email,
                 name,
                 to,
                 subject,
                 message):
    send_mail(
        subject,
        message,
        to[0],
        sender_email,
        fail_silently=False,
    )
