export const genarateStepAction = (
  type: string,
  selectedRole: string,
  isSecondMeeting: boolean
) => {
  if (
    type == "Recommended" ||
    type == "Verified" ||
    type == "Not Recommended" ||
    type == "Recommended"
  ) {
    return "PROCEED";
  }
  if (type == "Return") {
    return "RETURNED";
  }
  if (type == "Reject") {
    return "REJECTED";
  }
  if (
    type == "Approve" &&
    (selectedRole === "BOD1" || selectedRole === "BOD2")
  ) {
    return "PROCEED";
  }
  if (
    type == "Approve" &&
    (selectedRole === "BM" || selectedRole === "AM" || selectedRole === "RM") &&
    !isSecondMeeting
  ) {
    return "AP";
  }
  if (type == "Approve") {
    return "APPROVED";
  }
};

export const genarateStepStatus = (type: string, selectedRole: string) => {
  // if(type == 'Recommend'
  // || type == 'Verifed'
  // || type == 'Not Recommend'
  // || type == 'Recommend'
  // ){
  //   return 'PROCEED'
  // }
  if (type == "Return") {
    return "RETURNED";
  }
  if (type == "Reject") {
    return "REJECTED";
  }
  if (
    type == "Approve" &&
    (selectedRole === "BOD1" || selectedRole === "BOD2")
  ) {
    return "RECOMMENDED";
  }
  if (type == "Approve") {
    return "APPROVED";
  } else {
    return type.toUpperCase();
  }
};
