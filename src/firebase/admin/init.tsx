
import admin from 'firebase-admin';

const serviceAccount = {
    "project_id": "example-3f2d6",
    "private_key_id": "8dea24b3b749c7bc3f52026118f2b166a0c4eb1e",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDWIreiPH/9yDHV\nyqtaj9sbqAHIhwiI39BRt3AHcRFCmdPV5FKWi6vWFPez/nkDDQ8s3rUSDJ5qrCbM\nLjjXXz2exNrvU1aUREHBrU5MOkIfSUbg6lb6SM9KunplYDOVFKjYwM9UGzbFD+JA\nkd9CZHa75+A5b+lpBiQGhHoNzRduXJ8VQ7MWEzpEPvdA02/MetmhsfE1GFbhrq1L\n5Tvr5IlqUUAZxu+5DbWjdchkOWDDUyoiEil8jLkOAgpjRrw6nZOQRVyWBxEkAlVD\nln080tyqsru6APHSVjrD5BxKMkvNMddcuY0Zka7eyWFWpGx4EZqKlqcRk/4C0Zfp\nqToa+9o9AgMBAAECggEAFTeEZWVEM0OKOIont0XoqlFXt+Q1QsaWT/pydbJMyQIP\n3LIOQs9c+83BC0sL93LsTYBVhY/NhHlBMNrlk+ViaCBOJwdlXTR0JXoD94aQNaRf\nivp9GrhrHZbjeLby9XMCFdPo1wcJQrZDry0k52Gn6A9eBqLhiB/tIt4ub76h8zO4\npT8XN1AO9bcY1Gj7huB7Xfdb4PTyp7VcPRDoShmZ5rJH50XG9ZEY6YhNIBe7Lgfm\nW3wXoD5eL1rtCJzU/1TRHj/cF4D4PXWv9dEj/DGA5bvKVh3RnFrkgY+nveuZ+Daz\nOCCgUxEVStszXONn4ATb4mjtoXI8XWck87fHYbTh8QKBgQD7hT5V9eIjETiXribl\nr1Ioey3gca17q0TyXFZSL6ViMUJndeIMF7iOsoTRJNoeCZ7qlGqpwYSQjhISOe0i\nKyOE1ItzjZhLKibHsDIak4MVs9LHIJDoD7Ebiw3gnpbUy3z1kBDDTb+PPkrihyrS\ntD88vHJJaTSNJ3R7ujGIoKpAyQKBgQDZ8wZuAMeZ0fDirWQjxk609Ph9o92ERsDw\nM1eWS0gLFQRqJvjPE6PxH0unk2Pw/THlpr/q82OGtuPe3pZtwtgBzLL6WHD9vnzm\nKVFZ9Ih8L/QUJGvFeJY5o1CX5l//f/6qsQJrs/4bSuytSbLaiqXNJdkkp85yWXsZ\nCXQkJKjb1QKBgF69q+NZQRsQa47G7KPrzDivXXKDn2NL+iaInYNLqzI3d9ncz47a\niIxHtjvJc9eIrDGUQjE7UaHZwfjXlPkf4rswDG80UL9PW1gwiE72bZQJLkYPgEXJ\nU18am9mWIx54n9Mntwi6CoP8ZNy7KWhAuOk52prIZCEfUYMheXMLgdXxAoGAGiVT\nYiLpzwQmd6sBVmFV09OHc9sSmem6/5XJLhh93gZ5bxqZwo3Cnwx4EPRXivN05u3o\nHBFyoRiToYrmVOiI7T5XQj0V4PrXFO1j+vyg2vUNvNTZsOjUbLmw02gpoAcE0AlI\nFw+SrkeAuREcSadUWJXvxLv0wjcF020U57kWILkCgYAvtJy91IInqJdjJKcFOmaE\nxde0FHN8oAzNxeCnPYyh/rVnE1fe+TZWaOSSfBcqX3Z9h5xi93TAlxY4aBK7TjHx\n/U6BXUtfmzMFEZ7Rbj7nuDK6edqooqKHJ3BGrMAbRg/oehthvcYzoCzdPplJ4yxo\n81Oy8T0P9kdHuthQvPb2JQ==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-59e28@example-3f2d6.iam.gserviceaccount.com"
}

try {
    admin.initializeApp({
        credential: admin.credential.cert({
            privateKey: serviceAccount.private_key,
            clientEmail: serviceAccount.client_email,
            projectId: serviceAccount.project_id,
        }),
        databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
    })
    console.log('Initialized.')
} catch (error) {
    console.log(error);
}

export default admin;
