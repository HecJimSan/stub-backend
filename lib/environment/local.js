module.exports = {
  env: 'local',
  port: 3006,
  pathDb: {
    to: '/resources',
    from: '/@hectorjs/stub-backend/lib/app/shared/read-db-files',
    abs: '../../../../resources'
  }
};