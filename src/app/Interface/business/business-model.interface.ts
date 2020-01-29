import { BusinessSummary } from 'src/app/models/business.summary.model';
export interface IBusinessModel {
  ID: any; // guid;

  CompanyName: string;

  QBCompanyID: string;

  Domain: number;

  RiskScore: number;

  DebtorDaysRatio: number;

  BorrowerID: string;

  legalName: string;

  Country: string;

  Email: string;

  FiscalYearStartMonth: string;

  CompanyStartDate: string;

  IndustryType: string;

  SectorType: any; // byte

  AccessToken: string;

  RefreshToken: string;

  RiskScoreLastUpdatedDate: Date;

  LastDownloadedDate: string;

  LastConnectedDate: string;

  time: string;

  Description: string;

  KycStatus: any; // byte

  IsUpdateDescription: boolean;

  BusinessHash: string;

  TotalBusinesses: number;

  TokensExpiredBit:boolean;

  HoursDifference: string;

  expireDate:any;
  BusinessSummary:BusinessSummary
  }
