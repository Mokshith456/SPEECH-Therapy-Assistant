# File: agents/coordinator.py
from agents.exercise_generator import DisorderAgent, DISORDER_COLLECTION_MAP

class MultiDisorderCoordinator:
    def __init__(self):
        self.agents = {
            disorder: DisorderAgent(collection)
            for disorder, collection in DISORDER_COLLECTION_MAP.items()
        }

    def get_weekly_plan(self, disorder_type, patient_data):
        return self.agents[disorder_type].generate_exercises(patient_data)
