import pika, json
from consultations import User, db
params = pika.URLParameters('amqps://meiozege:n3veFiC_O8waZbEG0GVXXr1D6s9hRCLa@vulture.rmq.cloudamqp.com/meiozege')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='consultations')

def callback(ch, method, properties, body):
    print('Received in consultations')
    data = json.loads(body)
    print(data)

    if properties.content_type == 'user_created':
        user = User(id=data['id'], first_name=data['first_name'], last_name=data['last_name'], email=data['email'])
        db.session.add(user)
        db.session.commit()
        print('User Created')

    elif properties.content_type == 'user_deleted':
        user = User.query.get(data)
        db.session.delete(user)
        db.session.commit()
        print('User Deleted')

channel.basic_consume(queue='consultations',on_message_callback=callback, auto_ack=True)

print('Started consuming')

channel.start_consuming()

channel.close()
