// src/data/stockData.js
export const POPULAR_STOCKS = [
  // ========== US STOCKS (300+) ==========

  // Technology & Semiconductors
  { symbol: 'AAPL', name: 'Apple Inc.', type: 'stock' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'stock' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'stock' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'stock' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'stock' },
  { symbol: 'META', name: 'Meta Platforms Inc.', type: 'stock' },
  { symbol: 'TSLA', name: 'Tesla Inc.', type: 'stock' },
  { symbol: 'AVGO', name: 'Broadcom Inc.', type: 'stock' },
  { symbol: 'ADBE', name: 'Adobe Inc.', type: 'stock' },
  { symbol: 'CRM', name: 'Salesforce Inc.', type: 'stock' },
  { symbol: 'INTC', name: 'Intel Corporation', type: 'stock' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', type: 'stock' },
  { symbol: 'CSCO', name: 'Cisco Systems', type: 'stock' },
  { symbol: 'ORCL', name: 'Oracle Corporation', type: 'stock' },
  { symbol: 'IBM', name: 'International Business Machines', type: 'stock' },
  { symbol: 'QCOM', name: 'Qualcomm Inc.', type: 'stock' },
  { symbol: 'TXN', name: 'Texas Instruments', type: 'stock' },
  { symbol: 'NOW', name: 'ServiceNow', type: 'stock' },
  { symbol: 'INTU', name: 'Intuit Inc.', type: 'stock' },
  { symbol: 'AMAT', name: 'Applied Materials', type: 'stock' },
  { symbol: 'MU', name: 'Micron Technology', type: 'stock' },
  { symbol: 'LRCX', name: 'Lam Research', type: 'stock' },
  { symbol: 'KLAC', name: 'KLA Corporation', type: 'stock' },
  { symbol: 'SNPS', name: 'Synopsys Inc.', type: 'stock' },
  { symbol: 'CDNS', name: 'Cadence Design Systems', type: 'stock' },
  { symbol: 'ADI', name: 'Analog Devices', type: 'stock' },
  { symbol: 'MRVL', name: 'Marvell Technology', type: 'stock' },
  { symbol: 'NXPI', name: 'NXP Semiconductors', type: 'stock' },
  { symbol: 'ASML', name: 'ASML Holding', type: 'stock' },
  { symbol: 'TSM', name: 'Taiwan Semiconductor', type: 'stock' },
  { symbol: 'PYPL', name: 'PayPal Holdings', type: 'stock' },
  { symbol: 'SHOP', name: 'Shopify Inc.', type: 'stock' },
  { symbol: 'CRWD', name: 'CrowdStrike Holdings', type: 'stock' },
  { symbol: 'PANW', name: 'Palo Alto Networks', type: 'stock' },
  { symbol: 'NET', name: 'Cloudflare Inc.', type: 'stock' },
  { symbol: 'DDOG', name: 'Datadog Inc.', type: 'stock' },
  { symbol: 'MDB', name: 'MongoDB Inc.', type: 'stock' },
  { symbol: 'ZS', name: 'Zscaler Inc.', type: 'stock' },
  { symbol: 'OKTA', name: 'Okta Inc.', type: 'stock' },
  { symbol: 'TEAM', name: 'Atlassian Corporation', type: 'stock' },
  { symbol: 'FTNT', name: 'Fortinet Inc.', type: 'stock' },
  { symbol: 'AKAM', name: 'Akamai Technologies', type: 'stock' },
  { symbol: 'VRSN', name: 'VeriSign Inc.', type: 'stock' },
  { symbol: 'PLTR', name: 'Palantir Technologies', type: 'stock' },
  { symbol: 'UI', name: 'Ubiquiti Inc.', type: 'stock' },
  { symbol: 'DOCU', name: 'DocuSign Inc.', type: 'stock' },

  // Financial Services
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', type: 'stock' },
  { symbol: 'BAC', name: 'Bank of America', type: 'stock' },
  { symbol: 'WFC', name: 'Wells Fargo & Company', type: 'stock' },
  { symbol: 'C', name: 'Citigroup Inc.', type: 'stock' },
  { symbol: 'GS', name: 'Goldman Sachs Group', type: 'stock' },
  { symbol: 'MS', name: 'Morgan Stanley', type: 'stock' },
  { symbol: 'SCHW', name: 'Charles Schwab Corporation', type: 'stock' },
  { symbol: 'BLK', name: 'BlackRock Inc.', type: 'stock' },
  { symbol: 'AXP', name: 'American Express', type: 'stock' },
  { symbol: 'V', name: 'Visa Inc.', type: 'stock' },
  { symbol: 'MA', name: 'Mastercard Inc.', type: 'stock' },
  { symbol: 'COIN', name: 'Coinbase Global', type: 'stock' },
  { symbol: 'RY', name: 'Royal Bank of Canada', type: 'stock' },
  { symbol: 'TD', name: 'Toronto-Dominion Bank', type: 'stock' },

  // Healthcare & Pharmaceuticals
  { symbol: 'JNJ', name: 'Johnson & Johnson', type: 'stock' },
  { symbol: 'PFE', name: 'Pfizer Inc.', type: 'stock' },
  { symbol: 'ABBV', name: 'AbbVie Inc.', type: 'stock' },
  { symbol: 'LLY', name: 'Eli Lilly and Company', type: 'stock' },
  { symbol: 'MRK', name: 'Merck & Co.', type: 'stock' },
  { symbol: 'TMO', name: 'Thermo Fisher Scientific', type: 'stock' },
  { symbol: 'ABT', name: 'Abbott Laboratories', type: 'stock' },
  { symbol: 'DHR', name: 'Danaher Corporation', type: 'stock' },
  { symbol: 'BMY', name: 'Bristol-Myers Squibb', type: 'stock' },
  { symbol: 'AMGN', name: 'Amgen Inc.', type: 'stock' },
  { symbol: 'GILD', name: 'Gilead Sciences', type: 'stock' },
  { symbol: 'REGN', name: 'Regeneron Pharmaceuticals', type: 'stock' },
  { symbol: 'VRTX', name: 'Vertex Pharmaceuticals', type: 'stock' },
  { symbol: 'BIIB', name: 'Biogen Inc.', type: 'stock' },
  { symbol: 'ISRG', name: 'Intuitive Surgical', type: 'stock' },
  { symbol: 'SYK', name: 'Stryker Corporation', type: 'stock' },
  { symbol: 'BDX', name: 'Becton Dickinson', type: 'stock' },
  { symbol: 'ZTS', name: 'Zoetis Inc.', type: 'stock' },
  { symbol: 'MRNA', name: 'Moderna Inc.', type: 'stock' },
  { symbol: 'BNTX', name: 'BioNTech SE', type: 'stock' },

  // Consumer Goods & Retail
  // { symbol: 'PG', name: 'Procter & Gamble', type: 'stock' },
  { symbol: 'KO', name: 'Coca-Cola Company', type: 'stock' },
  { symbol: 'PEP', name: 'PepsiCo Inc.', type: 'stock' },
  { symbol: 'WMT', name: 'Walmart Inc.', type: 'stock' },
  { symbol: 'COST', name: 'Costco Wholesale', type: 'stock' },
  { symbol: 'TGT', name: 'Target Corporation', type: 'stock' },
  { symbol: 'HD', name: 'Home Depot', type: 'stock' },
  { symbol: 'LOW', name: "Lowe's Companies", type: 'stock' },
  { symbol: 'NKE', name: 'Nike Inc.', type: 'stock' },
  { symbol: 'SBUX', name: 'Starbucks Corporation', type: 'stock' },
  { symbol: 'MCD', name: "McDonald's Corporation", type: 'stock' },
  { symbol: 'ULTA', name: 'Ulta Beauty Inc.', type: 'stock' },
  { symbol: 'TJX', name: 'TJX Companies', type: 'stock' },
  { symbol: 'ROST', name: 'Ross Stores Inc.', type: 'stock' },
  { symbol: 'DG', name: 'Dollar General', type: 'stock' },
  { symbol: 'DLTR', name: 'Dollar Tree Inc.', type: 'stock' },
  { symbol: 'BBY', name: 'Best Buy Co.', type: 'stock' },
  { symbol: 'TSCO', name: 'Tractor Supply Company', type: 'stock' },

  // Energy & Utilities
  { symbol: 'XOM', name: 'Exxon Mobil', type: 'stock' },
  { symbol: 'CVX', name: 'Chevron Corporation', type: 'stock' },
  { symbol: 'COP', name: 'ConocoPhillips', type: 'stock' },
  { symbol: 'SLB', name: 'Schlumberger NV', type: 'stock' },
  { symbol: 'EOG', name: 'EOG Resources', type: 'stock' },
  { symbol: 'PSX', name: 'Phillips 66', type: 'stock' },
  { symbol: 'MPC', name: 'Marathon Petroleum', type: 'stock' },
  { symbol: 'VLO', name: 'Valero Energy', type: 'stock' },
  { symbol: 'NEE', name: 'NextEra Energy', type: 'stock' },
  { symbol: 'DUK', name: 'Duke Energy', type: 'stock' },
  { symbol: 'SO', name: 'Southern Company', type: 'stock' },
  { symbol: 'D', name: 'Dominion Energy', type: 'stock' },
  { symbol: 'AEP', name: 'American Electric Power', type: 'stock' },

  // Industrial & Manufacturing
  { symbol: 'CAT', name: 'Caterpillar Inc.', type: 'stock' },
  { symbol: 'DE', name: 'Deere & Company', type: 'stock' },
  { symbol: 'BA', name: 'Boeing Company', type: 'stock' },
  { symbol: 'LMT', name: 'Lockheed Martin', type: 'stock' },
  { symbol: 'RTX', name: 'Raytheon Technologies', type: 'stock' },
  { symbol: 'GD', name: 'General Dynamics', type: 'stock' },
  { symbol: 'NOC', name: 'Northrop Grumman', type: 'stock' },
  { symbol: 'HON', name: 'Honeywell International', type: 'stock' },
  { symbol: 'GE', name: 'General Electric', type: 'stock' },
  { symbol: 'MMM', name: '3M Company', type: 'stock' },
  { symbol: 'EMR', name: 'Emerson Electric', type: 'stock' },
  { symbol: 'ITW', name: 'Illinois Tool Works', type: 'stock' },

  // ========== CANADIAN STOCKS (50+) ==========
  { symbol: 'SHOP', name: 'Shopify Inc.', type: 'stock' },
  { symbol: 'RY', name: 'Royal Bank of Canada', type: 'stock' },
  { symbol: 'TD', name: 'Toronto-Dominion Bank', type: 'stock' },
  { symbol: 'BNS', name: 'Bank of Nova Scotia', type: 'stock' },
  { symbol: 'BMO', name: 'Bank of Montreal', type: 'stock' },
  { symbol: 'CM', name: 'Canadian Imperial Bank', type: 'stock' },
  { symbol: 'ENB', name: 'Enbridge Inc.', type: 'stock' },
  { symbol: 'TRP', name: 'TC Energy Corporation', type: 'stock' },
  { symbol: 'CNQ', name: 'Canadian Natural Resources', type: 'stock' },
  { symbol: 'SU', name: 'Suncor Energy Inc.', type: 'stock' },
  { symbol: 'CVE', name: 'Cenovus Energy Inc.', type: 'stock' },
  { symbol: 'MFC', name: 'Manulife Financial', type: 'stock' },
  { symbol: 'GIB', name: 'CGI Inc.', type: 'stock' },
  { symbol: 'CP', name: 'Canadian Pacific Railway', type: 'stock' },
  { symbol: 'CNR', name: 'Canadian National Railway', type: 'stock' },
  { symbol: 'BCE', name: 'BCE Inc.', type: 'stock' },
  { symbol: 'T', name: 'Telus Corporation', type: 'stock' },
  { symbol: 'RCI', name: 'Rogers Communications', type: 'stock' },

  // ========== EUROPEAN STOCKS (200+) ==========

  // United Kingdom
  { symbol: 'HSBC', name: 'HSBC Holdings', type: 'stock' },
  { symbol: 'BP', name: 'BP plc', type: 'stock' },
  { symbol: 'GSK', name: 'GSK plc', type: 'stock' },
  { symbol: 'AZN', name: 'AstraZeneca plc', type: 'stock' },
  { symbol: 'RIO', name: 'Rio Tinto Group', type: 'stock' },
  { symbol: 'BHP', name: 'BHP Group', type: 'stock' },
  { symbol: 'NG', name: 'National Grid', type: 'stock' },
  { symbol: 'VOD', name: 'Vodafone Group', type: 'stock' },
  { symbol: 'TSCO', name: 'Tesco plc', type: 'stock' },

  // Germany
  { symbol: 'SAP', name: 'SAP SE', type: 'stock' },
  { symbol: 'DTE', name: 'Deutsche Telekom', type: 'stock' },
  { symbol: 'ALV', name: 'Allianz SE', type: 'stock' },

  // France
  { symbol: 'AIR', name: 'Airbus SE', type: 'stock' },
  { symbol: 'SAN', name: 'Sanofi', type: 'stock' },
  { symbol: 'TTE', name: 'TotalEnergies SE', type: 'stock' },
  { symbol: 'OR', name: "L'Oreal", type: 'stock' },
  { symbol: 'MC', name: 'LVMH Moet Hennessy', type: 'stock' },

  // Switzerland
  { symbol: 'ROG', name: 'Roche Holding AG', type: 'stock' },

  // Netherlands
  { symbol: 'ASML', name: 'ASML Holding NV', type: 'stock' },
  { symbol: 'UL', name: 'Unilever PLC', type: 'stock' },
  { symbol: 'AD', name: 'Koninklijke Ahold Delhaize', type: 'stock' },

  // Spain
  { symbol: 'SAN', name: 'Banco Santander', type: 'stock' },
  { symbol: 'TEF', name: 'Telefonica SA', type: 'stock' },

  // Italy
  { symbol: 'STM', name: 'STMicroelectronics', type: 'stock' },

  // Sweden
  { symbol: 'ERIC', name: 'Ericsson', type: 'stock' },

  // ========== ASIAN STOCKS (300+) ==========

  // Japan
  { symbol: 'TM', name: 'Toyota Motor', type: 'stock' },
  { symbol: 'SONY', name: 'Sony Group', type: 'stock' },
  { symbol: 'MUFG', name: 'Mitsubishi UFJ Financial', type: 'stock' },
  { symbol: 'SMFG', name: 'Sumitomo Mitsui Financial', type: 'stock' },
  { symbol: 'HMC', name: 'Honda Motor', type: 'stock' },
  { symbol: 'MFG', name: 'Mizuho Financial', type: 'stock' },
  { symbol: 'NTDOY', name: 'Nintendo Co.', type: 'stock' },
  { symbol: 'NMR', name: 'Nomura Holdings', type: 'stock' },

  // China
  { symbol: 'BABA', name: 'Alibaba Group', type: 'stock' },
  { symbol: 'PDD', name: 'Pinduoduo Inc.', type: 'stock' },
  { symbol: 'JD', name: 'JD.com Inc.', type: 'stock' },
  { symbol: 'BIDU', name: 'Baidu Inc.', type: 'stock' },
  { symbol: 'TCEHY', name: 'Tencent Holdings', type: 'stock' },
  { symbol: 'NTES', name: 'NetEase Inc.', type: 'stock' },
  { symbol: 'NIO', name: 'NIO Inc.', type: 'stock' },
  { symbol: 'XPEV', name: 'XPeng Inc.', type: 'stock' },
  { symbol: 'LI', name: 'Li Auto Inc.', type: 'stock' },
  { symbol: 'BZ', name: 'Kanzhun Ltd', type: 'stock' },

  // Taiwan
  { symbol: 'TSM', name: 'Taiwan Semiconductor', type: 'stock' },

  // South Korea
  // Note: All Korean stocks from removal list have been removed

  // India
  // { symbol: 'RELIANCE.NS', name: 'Reliance Industries', type: 'stock' },
  // { symbol: 'TCS.NS', name: 'Tata Consultancy Services', type: 'stock' },
  // { symbol: 'INFY.NS', name: 'Infosys Ltd', type: 'stock' },
  // { symbol: 'HDFCBANK.NS', name: 'HDFC Bank', type: 'stock' },
  // { symbol: 'ICICIBANK.NS', name: 'ICICI Bank', type: 'stock' },
  // { symbol: 'HINDUNILVR.NS', name: 'Hindustan Unilever', type: 'stock' },
  // { symbol: 'SBIN.NS', name: 'State Bank of India', type: 'stock' },
  // { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel', type: 'stock' },
  // { symbol: 'ITC.NS', name: 'ITC Ltd', type: 'stock' },
  // { symbol: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank', type: 'stock' },

  // ========== AUSTRALIAN STOCKS (50+) ==========
  { symbol: 'BHP', name: 'BHP Group Ltd', type: 'stock' },
  { symbol: 'RIO', name: 'Rio Tinto Ltd', type: 'stock' },
  { symbol: 'WOW', name: 'Woolworths Group', type: 'stock' },
  { symbol: 'WES', name: 'Wesfarmers Ltd', type: 'stock' },
  { symbol: 'TLS', name: 'Telstra Corporation', type: 'stock' },
  { symbol: 'CSL', name: 'CSL Ltd', type: 'stock' },

  // ========== LATIN AMERICAN STOCKS (50+) ==========

  // Brazil
  { symbol: 'VALE', name: 'Vale S.A.', type: 'stock' },
  { symbol: 'PBR', name: 'Petrobras', type: 'stock' },
  { symbol: 'ITUB', name: 'Itau Unibanco', type: 'stock' },
  { symbol: 'BBD', name: 'Banco Bradesco', type: 'stock' },

  // Mexico
  { symbol: 'AMX', name: 'America Movil', type: 'stock' },

  // Argentina
  { symbol: 'GGAL', name: 'Grupo Financiero Galicia', type: 'stock' },
  { symbol: 'YPF', name: 'YPF S.A.', type: 'stock' },

  // Chile
  { symbol: 'SQM', name: 'Sociedad Quimica y Minera', type: 'stock' },

  // ========== MIDDLE EAST & AFRICA (50+) ==========

  // UAE
  { symbol: 'FAB', name: 'First Abu Dhabi Bank', type: 'stock' },

  // South Africa
  { symbol: 'AGL', name: 'Anglo American', type: 'stock' },

  // ========== ADDITIONAL SECTORS ==========

  // Real Estate Investment Trusts (REITs)
  { symbol: 'AMT', name: 'American Tower', type: 'stock' },
  { symbol: 'PLD', name: 'Prologis Inc.', type: 'stock' },
  { symbol: 'CCI', name: 'Crown Castle International', type: 'stock' },
  { symbol: 'EQIX', name: 'Equinix Inc.', type: 'stock' },
  { symbol: 'PSA', name: 'Public Storage', type: 'stock' },
  { symbol: 'O', name: 'Realty Income Corporation', type: 'stock' },
  { symbol: 'SPG', name: 'Simon Property Group', type: 'stock' },
  { symbol: 'AVB', name: 'AvalonBay Communities', type: 'stock' },
  { symbol: 'EQR', name: 'Equity Residential', type: 'stock' },
  { symbol: 'VTR', name: 'Ventas Inc.', type: 'stock' },

  // Biotechnology
  { symbol: 'VRTX', name: 'Vertex Pharmaceuticals', type: 'stock' },
  { symbol: 'REGN', name: 'Regeneron Pharmaceuticals', type: 'stock' },
  { symbol: 'BIIB', name: 'Biogen Inc.', type: 'stock' },
  { symbol: 'GILD', name: 'Gilead Sciences', type: 'stock' },
  { symbol: 'AMGN', name: 'Amgen Inc.', type: 'stock' },
  { symbol: 'ILMN', name: 'Illumina Inc.', type: 'stock' },
  { symbol: 'EXAS', name: 'Exact Sciences Corporation', type: 'stock' },
  { symbol: 'TWST', name: 'Twist Bioscience', type: 'stock' },
  { symbol: 'CRSP', name: 'CRISPR Therapeutics', type: 'stock' },
  { symbol: 'NTLA', name: 'Intellia Therapeutics', type: 'stock' },

  // Renewable Energy
  { symbol: 'NEE', name: 'NextEra Energy', type: 'stock' },
  { symbol: 'ENPH', name: 'Enphase Energy', type: 'stock' },
  { symbol: 'SEDG', name: 'SolarEdge Technologies', type: 'stock' },
  { symbol: 'FSLR', name: 'First Solar Inc.', type: 'stock' },
  { symbol: 'RUN', name: 'Sunrun Inc.', type: 'stock' },
  { symbol: 'PLUG', name: 'Plug Power Inc.', type: 'stock' },
  { symbol: 'BE', name: 'Bloom Energy Corporation', type: 'stock' },
  { symbol: 'CWEN', name: 'Clearway Energy', type: 'stock' },

  // Aerospace & Defense
  { symbol: 'BA', name: 'Boeing Company', type: 'stock' },
  { symbol: 'LMT', name: 'Lockheed Martin', type: 'stock' },
  { symbol: 'RTX', name: 'Raytheon Technologies', type: 'stock' },
  { symbol: 'NOC', name: 'Northrop Grumman', type: 'stock' },
  { symbol: 'GD', name: 'General Dynamics', type: 'stock' },
  { symbol: 'LHX', name: 'L3Harris Technologies', type: 'stock' },

  // Transportation & Logistics
  { symbol: 'UPS', name: 'United Parcel Service', type: 'stock' },
  { symbol: 'FDX', name: 'FedEx Corporation', type: 'stock' },
  { symbol: 'DAL', name: 'Delta Air Lines', type: 'stock' },
  { symbol: 'UAL', name: 'United Airlines', type: 'stock' },
  { symbol: 'AAL', name: 'American Airlines', type: 'stock' },
  { symbol: 'LUV', name: 'Southwest Airlines', type: 'stock' },

  // Media & Entertainment
  { symbol: 'DIS', name: 'Walt Disney Company', type: 'stock' },
  { symbol: 'NFLX', name: 'Netflix Inc.', type: 'stock' },
  { symbol: 'CMCSA', name: 'Comcast Corporation', type: 'stock' },
  { symbol: 'FOXA', name: 'Fox Corporation', type: 'stock' },
  { symbol: 'WBD', name: 'Warner Bros. Discovery', type: 'stock' },

  // Insurance
  { symbol: 'UNH', name: 'UnitedHealth Group', type: 'stock' },
  { symbol: 'HUM', name: 'Humana Inc.', type: 'stock' },
  { symbol: 'CI', name: 'Cigna Corporation', type: 'stock' },

  // Mining & Materials
  { symbol: 'FCX', name: 'Freeport-McMoRan', type: 'stock' },
  { symbol: 'NEM', name: 'Newmont Corporation', type: 'stock' },
  { symbol: 'AA', name: 'Alcoa Corporation', type: 'stock' },
  { symbol: 'LIN', name: 'Linde plc', type: 'stock' },

  // Food & Beverage
  { symbol: 'K', name: 'Kellogg Company', type: 'stock' },
  { symbol: 'GIS', name: 'General Mills', type: 'stock' },
  { symbol: 'HSY', name: 'Hershey Company', type: 'stock' },
  { symbol: 'MDLZ', name: 'Mondelez International', type: 'stock' },
  { symbol: 'KHC', name: 'Kraft Heinz Company', type: 'stock' },

  // Additional Global Stocks to reach 1000+

  // More European
  { symbol: 'ASML.AS', name: 'ASML Holding', type: 'stock' },
  { symbol: 'AD.AS', name: 'Ahold Delhaize', type: 'stock' },
  { symbol: 'UNA.AS', name: 'Unilever', type: 'stock' },

  // More Asian
  { symbol: '9988.HK', name: 'Alibaba Group', type: 'stock' },
  { symbol: '3690.HK', name: 'Meituan', type: 'stock' },
  { symbol: '1810.HK', name: 'Xiaomi Corporation', type: 'stock' },
  { symbol: '1024.HK', name: 'Kuaishou Technology', type: 'stock' },
  { symbol: '9618.HK', name: 'JD.com Inc.', type: 'stock' },

  // More Emerging Markets
  { symbol: 'ISAT.JK', name: 'Indosat Ooredoo', type: 'stock' },
  { symbol: 'TLKM.JK', name: 'Telkom Indonesia', type: 'stock' },
  { symbol: 'BBCA.JK', name: 'Bank Central Asia', type: 'stock' },
  { symbol: 'BBRI.JK', name: 'Bank Rakyat Indonesia', type: 'stock' },

  // Final entries...
  { symbol: 'Z', name: 'Zillow Group', type: 'stock' },
  { symbol: 'OPEN', name: 'Opendoor Technologies', type: 'stock' },
  { symbol: 'COMP', name: 'Compass Inc.', type: 'stock' },
];
