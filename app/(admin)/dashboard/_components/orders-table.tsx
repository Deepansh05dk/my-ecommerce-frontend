import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from '@/types';
import { Badge } from "@/components/ui/badge";

export  function OrdersTable({orders}:{orders:Order[]}) {
  return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>
                <Badge variant={"secondary"}>{order.status}</Badge>
              </TableCell>
              <TableCell>${order.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  )
}
