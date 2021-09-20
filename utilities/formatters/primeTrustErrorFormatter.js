export default (error) => ({ message: `${error.title}: ${error.detail}`, id: Math.random() });
