import CardWrapper from '@/app/ui/dashboard/cards';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data';

export default async function Page() {
  const revenue = fetchRevenue();
  const latestInvoices = fetchLatestInvoices();
  const cardData = fetchCardData();

  const [
    revenueData,
    latestInvoicesData,
    {
      numberOfInvoices,
      numberOfCustomers,
      totalPaidInvoices,
      totalPendingInvoices,
    },
  ] = await Promise.all([revenue, latestInvoices, cardData]);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper
          totalPaidInvoices={totalPaidInvoices}
          totalPendingInvoices={totalPendingInvoices}
          numberOfInvoices={numberOfInvoices}
          numberOfCustomers={numberOfCustomers}
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenueData} />
        <LatestInvoices latestInvoices={latestInvoicesData} />
      </div>
    </main>
  );
}
