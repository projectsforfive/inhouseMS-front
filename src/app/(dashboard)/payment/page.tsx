import Payment from '@/views/payment/HistoryTable';
import {db} from '@/app/server/actions';

const PaymentPage = async () => {
  return (
    <Payment tableData={db}  />
  );
};

export default PaymentPage;
