import { referrals } from "@/constants/referrals";

const Referrals: React.FC = () => {
  return (
    <div>
      <h2 className="sm:text-4xl text-2xl font-medium title-font uppercase">
        Referrals
      </h2>
      <h6 className="font-semibold text-sm md:text-lg text-center opacity-75">
        User our referral to support us!
      </h6>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {referrals.map((referral) => (
          <div key={referral.name} className="flex flex-col items-center">
            <div className="text-4xl mb-2">{referral.icons}</div>
            <h3 className="text-lg font-semibold">{referral.name}</h3>
            <p className="text-sm text-gray-600">{referral.referralCode}</p>
            <a
              href={referral.referralLink}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Visit
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Referrals;
