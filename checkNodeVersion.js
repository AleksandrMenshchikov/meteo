(function fn() {
  const nodeVersion = 'v22.21.1';

  if (process.version !== nodeVersion) {
    console.error(`Node version not match the version ${nodeVersion}`);
    process.exit(1);
  }
})();
