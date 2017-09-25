Executing (default): DROP TABLE IF EXISTS "users" CASCADE;
Executing (default): DROP TABLE IF EXISTS "pages" CASCADE;
Executing (default): DROP TYPE IF EXISTS "public"."enum_pages_status";
Executing (default): DROP TABLE IF EXISTS "pages" CASCADE;
Executing (default): DROP TYPE IF EXISTS "public"."enum_pages_status";
Executing (default): SELECT t.typname enum_name, array_agg(e.enumlabel ORDER BY enumsortorder) enum_value FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace WHERE n.nspname = 'public' AND t.typname='enum_pages_status' GROUP BY 1
Executing (default): DROP TYPE IF EXISTS "public"."enum_pages_status"; CREATE TYPE "public"."enum_pages_status" AS ENUM('open', 'closed');
TypeError: Cannot read property '0' of undefined
    at query.catch.then.then.queryResult (/Users/cmccarthy/Desktop/GHP/Junior_Phase/workshops/wikistack/node_modules/sequelize/lib/dialects/postgres/query.js:112:17)
    at tryCatcher (/Users/cmccarthy/Desktop/GHP/Junior_Phase/workshops/wikistack/node_modules/bluebird/js/release/util.js:16:23)
    at Promise._settlePromiseFromHandler (/Users/cmccarthy/Desktop/GHP/Junior_Phase/workshops/wikistack/node_modules/bluebird/js/release/promise.js:512:31)
    at Promise._settlePromise (/Users/cmccarthy/Desktop/GHP/Junior_Phase/workshops/wikistack/node_modules/bluebird/js/release/promise.js:569:18)
    at Promise._settlePromise0 (/Users/cmccarthy/Desktop/GHP/Junior_Phase/workshops/wikistack/node_modules/bluebird/js/release/promise.js:614:10)
    at Promise._settlePromises (/Users/cmccarthy/Desktop/GHP/Junior_Phase/workshops/wikistack/node_modules/bluebird/js/release/promise.js:693:18)
    at Async._drainQueue (/Users/cmccarthy/Desktop/GHP/Junior_Phase/workshops/wikistack/node_modules/bluebird/js/release/async.js:133:16)
    at Async._drainQueues (/Users/cmccarthy/Desktop/GHP/Junior_Phase/workshops/wikistack/node_modules/bluebird/js/release/async.js:143:10)
    at Immediate.Async.drainQueues (/Users/cmccarthy/Desktop/GHP/Junior_Phase/workshops/wikistack/node_modules/bluebird/js/release/async.js:17:14)
    at runCallback (timers.js:781:20)
    at tryOnImmediate (timers.js:743:5)
    at processImmediate [as _immediateCallback] (timers.js:714:5)




downgrade pg
https://github.com/sequelize/sequelize/issues/8209
