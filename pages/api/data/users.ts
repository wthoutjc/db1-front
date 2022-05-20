import type { NextApiRequest, NextApiResponse } from "next"

//db

// Enum
import { Hierarchy } from "../../../enum"

// Interfaces
import { DBDataUsers } from "../../../interfaces"

enum Method {
    post = "POST",
    get = "GET",
    put = "PUT",
  }

const handler = async (req: NextApiRequest, res: NextApiResponse) =>  {
    console.log(req.method);

    const data:DBDataUsers[] = [
        {
            id: '00000001',
            name: 'Usuario00000001',
            email: 'Usuario00000001@correo.com',
            age: 1,
            date: Date.now(),
            role: Hierarchy.admin,
        },
        {
            id: '00000002',
            name: 'Usuario00000002',
            email: 'Usuario00000002@correo.com',
            age: 2,
            date: Date.now(),
            role: Hierarchy.admin,
        },
        {
            id: '00000003',
            name: 'Usuario00000003',
            email: 'Usuario00000003@correo.com',
            age: 3,
            date: Date.now(),
            role: Hierarchy.admin,
        },
        {
            id: '00000004',
            name: 'Usuario00000004',
            email: 'Usuario00000004@correo.com',
            age: 4,
            date: Date.now(),
            role: Hierarchy.admin,
        },
        {
            id: '00000005',
            name: 'Usuario00000005',
            email: 'Usuario00000005@correo.com',
            age: 5,
            date: Date.now(),
            role: Hierarchy.admin,
        },
        {
            id: '00000006',
            name: 'Usuario00000006',
            email: 'Usuario00000006@correo.com',
            age: 6,
            date: Date.now(),
            role: Hierarchy.admin,
        },
        {
            id: '00000007',
            name: 'Usuario00000007',
            email: 'Usuario00000007@correo.com',
            age: 7,
            date: Date.now(),
            role: Hierarchy.admin,
        },
        {
            id: '00000008',
            name: 'Usuario00000008',
            email: 'Usuario00000008@correo.com',
            age: 8,
            date: Date.now(),
            role: Hierarchy.admin,
        },
        {
            id: '00000009',
            name: 'Usuario00000009',
            email: 'Usuario00000009@correo.com',
            age: 9,
            date: Date.now(),
            role: Hierarchy.admin,
        },
        {
            id: '00000010',
            name: 'Usuario00000010',
            email: 'Usuario00000010@correo.com',
            age: 10,
            date: Date.now(),
            role: Hierarchy.admin,
        },
        {
            id: '00000011',
            name: 'Usuario00000011',
            email: 'Usuario00000011@correo.com',
            age: 11,
            date: Date.now(),
            role: Hierarchy.client,
        },
        {
            id: '00000012',
            name: 'Usuario00000012',
            email: 'Usuario00000012@correo.com',
            age: 12,
            date: Date.now(),
            role: Hierarchy.client,
        },
        {
            id: '00000013',
            name: 'Usuario00000013',
            email: 'Usuario00000013@correo.com',
            age: 13,
            date: Date.now(),
            role: Hierarchy.client,
        },
        {
            id: '00000014',
            name: 'Usuario00000014',
            email: 'Usuario00000014@correo.com',
            age: 14,
            date: Date.now(),
            role: Hierarchy.client,
        },
        {
            id: '00000015',
            name: 'Usuario00000015',
            email: 'Usuario00000015@correo.com',
            age: 15,
            date: Date.now(),
            role: Hierarchy.client,
        },
        {
            id: '00000016',
            name: 'Usuario00000016',
            email: 'Usuario00000016@correo.com',
            age: 16,
            date: Date.now(),
            role: Hierarchy.client,
        },
        {
            id: '00000017',
            name: 'Usuario00000017',
            email: 'Usuario00000017@correo.com',
            age: 17,
            date: Date.now(),
            role: Hierarchy.client,
        },
        {
            id: '00000018',
            name: 'Usuario00000018',
            email: 'Usuario00000018@correo.com',
            age: 18,
            date: Date.now(),
            role: Hierarchy.client,
        },
        {
            id: '00000019',
            name: 'Usuario00000019',
            email: 'Usuario00000019@correo.com',
            age: 19,
            date: Date.now(),
            role: Hierarchy.client,
        },
        {
            id: '00000020',
            name: 'Usuario00000020',
            email: 'Usuario00000020@correo.com',
            age: 20,
            date: Date.now(),
            role: Hierarchy.client,
        },
        {
            id: '00000021',
            name: 'Usuario00000021',
            email: 'Usuario00000021@correo.com',
            age: 21,
            date: Date.now(),
            role: Hierarchy.employee,
        },
        {
            id: '00000022',
            name: 'Usuario00000022',
            email: 'Usuario00000022@correo.com',
            age: 22,
            date: Date.now(),
            role: Hierarchy.employee,
        },
        {
            id: '00000023',
            name: 'Usuario00000023',
            email: 'Usuario00000023@correo.com',
            age: 23,
            date: Date.now(),
            role: Hierarchy.employee,
        },
        {
            id: '00000024',
            name: 'Usuario00000024',
            email: 'Usuario00000024@correo.com',
            age: 24,
            date: Date.now(),
            role: Hierarchy.employee,
        },
        {
            id: '00000025',
            name: 'Usuario00000025',
            email: 'Usuario00000025@correo.com',
            age: 25,
            date: Date.now(),
            role: Hierarchy.employee,
        },
        {
            id: '00000026',
            name: 'Usuario00000026',
            email: 'Usuario00000026@correo.com',
            age: 26,
            date: Date.now(),
            role: Hierarchy.employee,
        },
        {
            id: '00000027',
            name: 'Usuario00000027',
            email: 'Usuario00000027@correo.com',
            age: 27,
            date: Date.now(),
            role: Hierarchy.employee,
        },
        {
            id: '00000028',
            name: 'Usuario00000028',
            email: 'Usuario00000028@correo.com',
            age: 28,
            date: Date.now(),
            role: Hierarchy.employee,
        },
        {
            id: '00000029',
            name: 'Usuario00000029',
            email: 'Usuario00000029@correo.com',
            age: 29,
            date: Date.now(),
            role: Hierarchy.employee,
        },
        {
            id: '00000030',
            name: 'Usuario00000030',
            email: 'Usuario00000030@correo.com',
            age: 30,
            date: Date.now(),
            role: Hierarchy.employee,
        },
        {
            id: '00000031',
            name: 'Usuario00000031',
            email: 'Usuario00000031@correo.com',
            age: 31,
            date: Date.now(),
            role: Hierarchy.admin,
        },
        {
            id: '00000032',
            name: 'Usuario00000032',
            email: 'Usuario00000032@correo.com',
            age: 32,
            date: Date.now(),
            role: Hierarchy.admin,
        },
        {
            id: '00000033',
            name: 'Usuario00000033',
            email: 'Usuario00000033@correo.com',
            age: 33,
            date: Date.now(),
            role: Hierarchy.admin,
        },
        {
            id: '00000034',
            name: 'Usuario00000034',
            email: 'Usuario00000034@correo.com',
            age: 34,
            date: Date.now(),
            role: Hierarchy.admin,
        },
        {
            id: '00000035',
            name: 'Usuario00000035',
            email: 'Usuario00000035@correo.com',
            age: 35,
            date: Date.now(),
            role: Hierarchy.admin,
        },
        {
            id: '00000036',
            name: 'Usuario00000036',
            email: 'Usuario00000036@correo.com',
            age: 36,
            date: Date.now(),
            role: Hierarchy.admin,
        },
        {
            id: '00000037',
            name: 'Usuario00000037',
            email: 'Usuario00000037@correo.com',
            age: 37,
            date: Date.now(),
            role: Hierarchy.admin,
        },
        {
            id: '00000038',
            name: 'Usuario00000038',
            email: 'Usuario00000038@correo.com',
            age: 38,
            date: Date.now(),
            role: Hierarchy.admin,
        },
        {
            id: '00000039',
            name: 'Usuario00000039',
            email: 'Usuario00000039@correo.com',
            age: 39,
            date: Date.now(),
            role: Hierarchy.admin,
        },
        {
            id: '00000040',
            name: 'Usuario00000040',
            email: 'Usuario00000040@correo.com',
            age: 40,
            date: Date.now(),
            role: Hierarchy.client,
        },
    ]

    return res.status(200).json(data)
}

export default handler