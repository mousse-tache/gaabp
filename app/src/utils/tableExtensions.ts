const sortMemberPriority = (
  a: Record<string, unknown>,
  b: Record<string, unknown>,
): number => {
  let value;

  console.log(a.nominations.type);

  switch (a.nominations.type) {
    case "Chef":
      value = 1000;
      break;
    case "Assistant":
      value = 500;
      break;
    case "Membre":
      value = 0;
      break;
    default:
      value = 1;
  }

  switch (b.nominations.type) {
    case "Chef":
      value -= 1000;
      break;
    case "Assistant":
      value -= 500;
      break;
    case "Membre":
      break;
    default:
      value -= 1;
  }

  return value;
};

export { sortMemberPriority };
