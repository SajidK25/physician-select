export const MAX_AMOUNT = 50;

export const drugIds = {
  EROS: "EROS",
  ROMEO: "ROMEO",
  TADALAFIL: "TADALAFIL",
  SILDENAFIL: "SILDENAFIL",
  TADALAFIL_DAILY: "TADALAFIL_DAILY",
  MALE_DAILY: "MALE_DAILY",
  DAILY_PLUS: "DAILY_PLUS",
  NO_ADDON: "NO_ADDON"
};

export const drugSelections = [
  {
    id: drugIds.EROS,
    category: "B",
    labelOptions: {
      label: "EROS",
      description: `Eros is a cutting edge formulation unlike any other medication currently available anywhere 
                    for the treatment of Erectile Dysfunction. 
                    Prescription strength Tadalafil (Cialis) and Apomorphine
                    are combined to create a super drug with a duration 
                    of action up to 48 hours.`,
      price: 18.75
    },
    doseOptions: [
      {
        id: "",
        default: true,
        labelOptions: {
          label: "",
          subTile: "",
          display: "EROS"
        },
        pricing: {
          threeMonth: 16.25,
          twoMonth: 17.25,
          monthly: 18.75
        }
      }
    ]
  },
  {
    id: drugIds.TADALAFIL_DAILY,
    category: "C",
    labelOptions: {
      label: "Tadalafil Daily (5mg)",
      description: "",
      price: 3.75
    },
    doseOptions: [
      {
        id: "",
        default: true,
        labelOptions: {
          title: "5mg",
          subTile: "",
          display: "Tadalafil Daily"
        },
        pricing: {
          threeMonth: 3.25,
          twoMonth: 3.5,
          monthly: 3.75
        }
      }
    ]
  },
  {
    id: drugIds.MALE_DAILY,
    category: "C",
    labelOptions: {
      label: "Male Daily",
      description: "",
      price: 1.4
    },
    doseOptions: [
      {
        id: "",
        default: true,
        labelOptions: {
          title: "",
          subTile: "",
          display: "Male Daily"
        },
        pricing: {
          threeMonth: 1.25,
          twoMonth: 1.35,
          monthly: 1.5
        }
      }
    ]
  },
  {
    id: drugIds.DAILY_PLUS,
    category: "C",
    labelOptions: {
      label: "Male Daily + Tadalafil Daily (5mg)",
      description: "",
      price: 5.0
    },
    doseOptions: [
      {
        id: "",
        default: true,
        labelOptions: {
          title: "",
          subTile: "",
          display: "Male Daily+Tadalafil 5mg"
        },
        pricing: {
          threeMonth: 4.25,
          twoMonth: 4.75,
          monthly: 5
        }
      }
    ]
  },
  {
    id: drugIds.TADALAFIL,
    category: "B",
    labelOptions: {
      label: "Tadalafil",
      description: "Generic form of Cialis used to treat Erectile Dysfunction",
      price: 15
    },
    doseOptions: [
      {
        id: "20",
        default: true,
        labelOptions: {
          label: "20mg",
          subTitle:
            "A starting dose of 20mg is most common for people who are new to medication.",
          display: "Tadalafil 20mg"
        },
        pricing: {
          threeMonth: 13,
          twoMonth: 13.75,
          monthly: 15
        }
      },
      {
        id: "10",
        default: false,
        labelOptions: {
          label: "10mg",
          subTitle: "",
          display: "Tadalafil 10mg"
        },
        pricing: {
          threeMonth: 6.5,
          twoMonth: 7.0,
          monthly: 7.5
        }
      }
    ]
  },
  {
    id: drugIds.ROMEO,
    category: "A",
    labelOptions: {
      label: "ROMEO",
      description: `Romeo is a combination product utilizing prescription 
                    strength Sildenafil (Viagra) as the primary component 
                    in conjunction with Apomorphine. Romeo is enhanced to 
                    be more effective than Viagra alone with a duration of 
                    action up to 6 hours.`,
      price: 10
    },
    doseOptions: [
      {
        id: "",
        default: true,
        labelOptions: {
          label: "",
          subTile: "",
          display: "ROMEO"
        },
        pricing: {
          threeMonth: 8.5,
          twoMonth: 9,
          monthly: 10
        }
      }
    ]
  },
  {
    id: drugIds.SILDENAFIL,
    category: "A",
    labelOptions: {
      label: "Sildenafil",
      description: "Generic form of Viagra used to treat Erectile Dysfunction",
      price: 8.75
    },
    doseOptions: [
      {
        id: "50",
        default: true,
        labelOptions: {
          label: "50mg",
          subTitle:
            "A starting dose of 50mg is most common for people who are new to medication.",
          display: "Sildenafil 50mg"
        },
        pricing: {
          threeMonth: 7.5,
          twoMonth: 8,
          monthly: 8.75
        }
      },
      {
        id: "25",
        default: false,
        labelOptions: {
          label: "25mg",
          subTitle: "",
          display: "Sildenafil 25mg"
        },
        pricing: {
          threeMonth: 4.5,
          twoMonth: 4.75,
          monthly: 5
        }
      }
    ]
  }
];

const addOns = [
  {
    id: drugIds.MALE_DAILY,
    category: "",
    labelOptions: {
      label: "Male Daily",
      description: "Yes! I want this supplement to enhance my results!",
      price: 1.2
    },
    pricing: {
      threeMonth: 1,
      twoMonth: 1.1,
      monthly: 1.2
    }
  },
  {
    id: drugIds.NO_ADDON,
    category: "",
    labelOptions: {
      label: "No Addon",
      description: "No thanks! I don't want to supercharge my treatment.",
      price: 0
    },
    pricing: {
      threeMonth: 0,
      twoMonth: 0,
      monthly: 0
    }
  }
];

export const getAddonList = () => {
  return addOns;
};

const getAddon = addOnId => {
  if (!addOnId || addOnId === drugIds.NO_ADDON) return null;

  return addOns.find(d => d.id === addOnId);
};

const getAddonPricing = addOnId => {
  const pricing = {
    threeMonth: 0,
    twoMonth: 0,
    monthly: 0
  };

  const addOn = getAddon(addOnId);
  if (!addOn) return pricing;

  return addOn.pricing;
};

const getAddonName = addOnId => {
  const addOn = getAddon(addOnId);
  if (!addOn) return "";

  return addOn.labelOptions.label;
};

// Get a list of drugs filtered by category
export const getDrugList = category => {
  return drugSelections.filter(d => d.category === category);
};

const getDrug = drugId => {
  let drug = drugSelections.find(d => d.id === drugId);

  return drug;
};

export const getDrugName = drugId => {
  const drug = getDrug(drugId);

  return drug ? drug.labelOptions.label : "";
};

export const getDoseOptions = drugId => {
  const drug = getDrug(drugId);
  if (!drug) return null;

  return drug.doseOptions;
};

const getDoseOption = (drugId, dose) => {
  const options = getDoseOptions(drugId);
  console.log("getDoseOption:id", drugId);
  console.log("getDoseOption:dose", dose);

  if (!options) return null;

  return options.find(o => o.id === dose);
};

export const validDoseOption = (drugId, dose) => {
  const option = getDoseOption(drugId, dose);
  if (!option) return false;

  return true;
};

export const defaultDose = drugId => {
  const options = getDoseOptions(drugId);
  if (!options) return "";

  const opt = options.find(o => o.default === true);
  if (!opt) return "";

  return opt.id;
};

export const getPrices = (drugId, dose, count, addOn) => {
  const pricing = {
    display: `${drugId} not found`,
    addOnDisplay: "",
    monthly: 0,
    monthlyDoses: 0,
    addOnMonthlyDoses: 0,
    twoMonth: 0,
    twoTotal: 0,
    twoDoses: 0,
    addOnTwoDoses: 0,
    threeMonth: 0,
    threeTotal: 0,
    threeDoses: 0,
    addOnThreeDoses: 0
  };

  const doseOption = getDoseOption(drugId, dose);
  if (!doseOption) return pricing;

  const addOnPricing = getAddonPricing(addOn);
  const addOnDisplay = getAddonName(addOn);

  pricing.display = doseOption.labelOptions.display;
  pricing.addOnDisplay = addOnDisplay;
  pricing.monthly =
    doseOption.pricing.monthly * count + addOnPricing.monthly * 30;
  pricing.monthlyDoses = count;
  pricing.addOnMonthlyDoses = 30;
  pricing.twoMonth =
    doseOption.pricing.twoMonth * count + addOnPricing.twoMonth * 30;
  pricing.twoTotal = pricing.twoMonth * 2;
  pricing.twoDoses = count * 2;
  pricing.addOnTwoDoses = 60;
  pricing.threeMonth =
    doseOption.pricing.threeMonth * count + addOnPricing.threeMonth * 30;
  pricing.threeTotal = pricing.threeMonth * 3;
  pricing.threeDoses = count * 3;
  pricing.addOnThreeDoses = 90;

  return pricing;
};

export const drugDisplaySetup = subscription => {
  const pricing = getPrices(
    subscription.drugId,
    subscription.doseOption,
    subscription.dosesPerMonth,
    subscription.addOnId
  );
  const options = {
    display: "",
    addOnDisplay: "",
    monthlyDoses: 0,

    title: "",
    total: 0,
    doses: 0,
    per: "",
    interval: "",
    noDiscount: 0
  };

  console.log("Pricing:", pricing);
  options.display = pricing.display;
  options.addOnDisplay = pricing.addOnDisplay;
  options.monthlyDoses = pricing.monthlyDoses;
  options.addOnMonthlyDoses = pricing.addOnMonthlyDoses;

  switch (subscription.shippingInterval) {
    case "everyThree":
      options.title = "3 Month Delivery";
      options.total = pricing.threeTotal;
      options.doses = pricing.threeDoses;
      options.addOnDoses = pricing.addOnThreeDoses;
      options.per = "3 mo";
      options.interval = "every 3 months";
      options.noDiscount = pricing.monthly * 3;
      break;

    case "everyTwo":
      options.title = "2 Month Delivery";
      options.total = pricing.twoTotal;
      options.doses = pricing.twoDoses;
      options.addOnDoses = pricing.addOnTwoDoses;
      options.per = "2 mo";
      options.interval = "every 2 months";
      options.noDiscount = pricing.monthly * 2;
      break;

    case "monthly":
      options.title = "Monthly Delivery";
      options.total = pricing.monthly;
      options.doses = pricing.monthlyDoses;
      options.addOnDoses = pricing.addOnMonthlyDoses;
      options.per = "mo";
      options.interval = "monthly";
      options.noDiscount = 0;
      break;

    default:
  }
  return options;
};
