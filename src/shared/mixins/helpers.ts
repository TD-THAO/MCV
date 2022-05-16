export default {
  methods: {
    convertArray(data: any) {
      let array: any = []
      Object.keys(data).map((key) => {
        const item = {
          id: key,
          ...data[key]
        };
        array.push(item);
      });
      return array;
    }
  }
}
