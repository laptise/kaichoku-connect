import { gql } from "@apollo/client";

export const UPDATE_USER_BANK_INFO = gql`
  mutation ($swiftCode: String!, $accountNo: String!, $accountType: String, $branchCode: String) {
    updateBankInfo(data: { swiftCode: $swiftCode, accountNo: $accountNo, accountType: $accountType, branchCode: $branchCode }) {
      swiftCode
    }
  }
`;
