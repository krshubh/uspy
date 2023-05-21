from django.core.mail import send_mail


def send_message(subject,
                 message):
    send_mail(
        subject,
        message,
        'admin@uspy.in',
        ['support@uspy.in'],
        fail_silently=False,
    )
