import * as React from 'react';
import { useEffect, useState } from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import api from '../../services/api';

let items:any = []
type Order = 'asc' | 'desc';
type Props = {
  currentBalance: string;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
};

export default function OrderList({currentBalance, setBalance}:Props) {
  const [order, setOrder] = React.useState<Order>('desc');
  const [amount, setAmount] = useState(0);
  const [minAmount, setMinAmount] = useState(0);
  const [notification, setNotification] = useState('');
    const [userId, setUserId] = useState("");
    const [fundId, setFundId] = useState("");
    const [status, setStatus] = useState(Boolean);
  const [open, setOpen] = React.useState(false);
    useEffect(() => {
      if (localStorage.getItem('user')) {
        const { id } = JSON.parse(localStorage.getItem('user') || '')
        setUserId(id)
      }
      
          fetchFunds()
    },[])
  
    const logout = () =>{
      localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.href = "/";
    }
  
  const fetchFunds = async () => {
    try {
      const res = await api.get("/funds")
      setBalance(res.data.user[0].balance)
      items = res.data.funds      
    } catch (error) {
      logout()
    }
  }
    const openModal = (min:number) => {
      setAmount(0)
      setNotification('')
      setMinAmount(min)
      setOpen(true)
    }

    const sendDataModal = () => {
      if (minAmount > amount) {
        alert(`La cantidad debe ser mayor a  $${minAmount}`)
        return
      }
      if (amount > Number(currentBalance) ) {
        alert(`La cantidad no puede ser mayor a $${currentBalance}`)
        return
      }
      if (!notification) {
        alert(`Selecciona un tipo de notificación`)
        return
      }
      setOpen(false)
      
      fetchSubcribe(fundId, true)
    }
    const subscribe = (id:string, status:boolean) => {
      setFundId(id)
      setStatus(status)
      const fund = items.find((x:any)=>x._id==id)
      if ( status ) {
        if (currentBalance < fund.minimumAmount) {
          alert(`No tiene saldo disponible para vincularse al fondo ${fund.name}`)
          
        }else{
          openModal(fund.minimumAmount)
        }
        return
      }else{
        fetchSubcribe(fund._id, status)
        
      }
      
      
    };
  const fetchSubcribe = (id:string, status:boolean) => {
      const idFun = fundId ? fundId : id
    const data = {fundId: id, userId, status, amount, notification}
    if (!status) {
      const fund = items.find((x:any)=>x._id==id)
      data.amount = fund.last.amount
    }
    api.post(`/transactions/subscribe`, data)
        .then(() => {
          fetchFunds()
          status ? alert("Suscripción exitosa") : alert("Cancelación exitosa")
        })
        .catch(err => {
          alert(err.response.data.message)
          logout()
        });
  }
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))}>
        <FormLabel>Cantidad</FormLabel>
        <Input type="number" name="amount" />
      </FormControl>
      <FormControl size="sm" >
        <FormLabel>notificación</FormLabel>
        <Select size="sm" name="notification"
          onChange={(event, value) => {
          if (value) setNotification(value as string);
    }}
        >
          <Option value="SMS">SMS</Option>
          <Option value="EMAIL">Email</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );


  return (
    <React.Fragment>
      
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" >
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Valores de Apertura
            </Typography>
            <Typography id="filter-modal" level="h4">
              Saldo Actual: ${currentBalance}
            </Typography>
            <Typography id="filter-modal" level="h4">
              Cantidad Mínima: ${minAmount}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => sendDataModal()}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>

              <th style={{ width: '20%', padding: '12px 6px' }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  endDecorator={<ArrowDropDownIcon />}
                  sx={[
                    {
                      fontWeight: 'lg',
                      '& svg': {
                        transition: '0.2s',
                        transform:
                          order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                      },
                    },
                    order === 'desc'
                      ? { '& svg': { transform: 'rotate(0deg)' } }
                      : { '& svg': { transform: 'rotate(180deg)' } },
                  ]}
                >
                  Nombre
                </Link>
              </th>
              
              <th style={{ width: '20%', padding: '12px 6px' }}>Categoria</th>
              <th style={{ width: '20%', padding: '12px 6px' }}>Valor Mínimo</th>
              <th style={{ width: '20%', padding: '12px 6px' }}>Valor Actual</th>
              <th style={{ width: '20%', padding: '12px 6px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {[...items].map((row) => (
              <tr key={row._id}>

                <td>
                  <Typography level="body-xs">{row.name}</Typography>
                </td>

                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar size="sm">{row.category}</Avatar>
                    
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <div>
                      <Typography level="body-xs">$ {row.minimumAmount}</Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <div>
                      <Typography level="body-xs">$ {row.last?.status ? row.last?.amount : 0}</Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <Button sx={{fontSize: 12, alignItems: 'center' , width:100}}
                    color={row.last?.status ? 'danger' : "success"}
                    startDecorator={row.last?.status ? <BlockIcon /> : <CheckRoundedIcon />}
                    size="sm"
                    onClick={() =>  row.last?.status ? subscribe(row._id, false) :  subscribe(row._id, true)}
                    >
                    {row.last?.status ? 'Cancelar' : 'Abrir' }
                </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

    </React.Fragment>
  );
}
