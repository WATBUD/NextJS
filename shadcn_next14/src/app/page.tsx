import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link'
const links = [
  { href: '/Test1', text: 'Test1' },
  { href: '/stockDashboard', text: 'stockDashboard' },
  { href: '/payments', text: 'payments' }

];
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>link</TableHead>
            {/* <TableHead>link</TableHead> */}
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>

        {links.map((link, index) => (
          <TableBody key={index}>
            <TableRow>
              <TableCell className="font-medium">
                <Link href={link.href}>{link.text}</Link>
              </TableCell>
              <TableCell>
                <Link href={link.href}>{link.text}</Link>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </main>
  );
}
