export const validate = async (formRef) => {
  try {
    const res = await formRef.validateFields();
    return res;
  } catch ({ errorFields }) {
    throw errorFields;
  }
};

export const resetForm = async (formRef) => {
  formRef?.resetFields();
};

export const notNul = (val) => val !== '' && val !== undefined && val !== null;