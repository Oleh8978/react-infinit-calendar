export default (sum) => sum?.toString()
      .replace(/(\$[\d,]+(\.\d{10})?)/g, '$1,') || 0; // 1500.3498 => 1,500.3498
