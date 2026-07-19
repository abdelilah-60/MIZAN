from contextlib import asynccontextmanager
from fastapi import FastAPI
from database import driver
from routes.ontology import router as ontology_router
from routes.insights import router as insights_router
from routes.admin import router as admin_router
from routes.agronomy import router as agronomy_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    driver.close()


app = FastAPI(lifespan=lifespan)

app.include_router(ontology_router)
app.include_router(insights_router)
app.include_router(admin_router)
app.include_router(agronomy_router)

@app.get("/")
def read_root():
    return {"message": "Mizan AI Brain is online"}

@app.get("/health/graph")
def health_graph():
    try:
        driver.verify_connectivity()
        return {"status": "connected", "database": "memgraph"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


